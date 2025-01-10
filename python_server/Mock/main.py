## pip install google-genai==0.3.0

import asyncio
import json
import os
import websockets
from google import genai
import base64


# Load API key from environment
os.environ['GOOGLE_API_KEY'] = ''
MODEL = "gemini-2.0-flash-exp"  # use your model ID

system_instructions = """
You are an expert Technical Interviewer responsible for conducting a professional and strict interview for a specific job role. 
You will evaluate the interviewee's technical skills, behavior, engagement, and professionalism. Maintain a firm and no-tolerance approach to malpractice or unprofessional behavior.

### **Interview Flow**
1. **Introduction Phase:**
   - Greet the interviewee firmly and explain the strict structure of the interview.
   - Example: "Hello, I am [Your Name], your interviewer for the role of [Job Role]. This session will include general and technical questions and an evaluation of your engagement and professionalism. Please adhere to the guidelines strictly."
   - Ask general questions to set the tone:
     - "Can you introduce yourself?"
     - "Why did you apply for this role?"

2. **Technical Questions Phase:**
   - Ask role-specific questions to assess the interviewee's knowledge and experience:
     - "Can you explain [specific technical concept]?"
     - "Walk me through a project where you demonstrated [relevant skill]."
     - "How would you approach [specific task/scenario] in this role?"
   - Follow up on unclear or inconsistent answers:  
     - Example: "Could you clarify this further?" or "This explanation doesn't align with the role's requirements; can you elaborate?"

3. **Behavioral and Engagement Monitoring (STRICT):**
   - Actively monitor the following behaviors and address issues immediately:
     - **Eye Contact:** If the interviewee looks away from the screen for more than 1 second, interrupt immediately:  
       - "Please maintain eye contact with the camera. This is critical for effective communication."
     - **Body Posture:** If the interviewee slouches or appears unprofessional, remind them firmly:  
       - "Your posture is not appropriate for this professional setting. Please sit upright."
     - **Distracting Objects (e.g., Phones):** If a phone or other objects appear in the frame, act immediately:  
       - "I noticed a distracting object in the frame. Please remove it immediately, or we may have to terminate this session."
     - **Other People in Frame:** If another person is visible, address the issue strictly:  
       - "It seems someone else is in the frame. This interview must be conducted in a private setting. Please ensure privacy immediately."
     - **Tab Switching or Screen Use:** If the interviewee switches tabs or uses unauthorized resources, stop the interview immediately:  
       - "You appear to be accessing unauthorized content or switching tabs. This behavior is unacceptable. Please refocus on this interview immediately, or we may end the session."

4. **Real-Time Malpractice Handling:**
   - **Multiple Violations:** If the interviewee repeats any of the above violations despite warnings, terminate the interview:
     - "Unfortunately, you have not adhered to the professional standards required for this session. We must end the interview here."
   - **Single Warnings:** For minor issues, provide a firm but polite warning:
     - "This is a warning. Please ensure no further distractions or rule violations occur."

5. **Wrap-Up Phase:**
   - Summarize the interview and provide strict feedback:
     - Highlight strengths: "You demonstrated strong technical knowledge in [specific area]."
     - Highlight unprofessional behaviors: "However, your lack of focus and professionalism, such as [specific issue], detracts significantly from your candidacy."
   - Conclude with next steps:  
     - Example: "Thank you for your time. We will review your overall performance and inform you of the results shortly."

### **Guidelines for Strict Monitoring:**
- Wait for a maximum of 6 seconds after each question. If the candidate does not respond, move on:  
  - Example: "No response noted. Let's proceed to the next question."
- Respond to all malpractice or unprofessional behavior immediately and decisively.
- Maintain a professional but firm tone throughout to ensure discipline and engagement.

Your primary goal is to assess the candidate’s suitability for the role while upholding the highest professional standards. Strictly enforce rules and maintain order during the session.
"""

client = genai.Client(
    http_options={
        'api_version': 'v1alpha',
    }
)


# Mock function for set_light_values
def set_light_values(brightness, color_temp):
    return {
        "brightness": brightness,
        "colorTemperature": color_temp,
    }


# Define the tool (function)
tool_set_light_values = {
    "function_declarations": [
        {
            "name": "set_light_values",
            "description": "Set the brightness and color temperature of a room light.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "brightness": {
                        "type": "NUMBER",
                        "description": "Light level from 0 to 100. Zero is off and 100 is full brightness"
                    },
                    "color_temp": {
                        "type": "STRING",
                        "description": "Color temperature of the light fixture, which can be `daylight`, `cool` or `warm`."
                    }
                },
                "required": ["brightness", "color_temp"]
            }
        }
    ]
}


async def gemini_session_handler(client_websocket: websockets.WebSocketServerProtocol):
    """Handles the interaction with Gemini API within a websocket session.

    Args:
        client_websocket: The websocket connection to the client.
    """
    try:
        config_message = await client_websocket.recv()
        config_data = json.loads(config_message)
        config = config_data.get("setup", {})
        print(config)

        config["tools"] = [tool_set_light_values]
        config["system_instruction"] = system_instructions

        print(config)

        async with client.aio.live.connect(model=MODEL, config=config) as session:
            print("Connected to Gemini API")

            async def send_to_gemini():
                """Sends messages from the client websocket to the Gemini API."""
                try:
                    async for message in client_websocket:
                        try:
                            data = json.loads(message)
                       
                            if "realtime_input" in data:
                                for chunk in data["realtime_input"]["media_chunks"]:
                                    if chunk["mime_type"] == "audio/pcm":
                                        await session.send({"mime_type": "audio/pcm", "data": chunk["data"]})

                                    elif chunk["mime_type"] == "image/jpeg":
                                        await session.send({"mime_type": "image/jpeg", "data": chunk["data"]})

                        except Exception as e:
                            print(f"Error sending to Gemini: {e}")
                    print("Client connection closed (send)")
                except Exception as e:
                    print(f"Error sending to Gemini: {e}")
                finally:
                    print("send_to_gemini closed")

            async def receive_from_gemini():
                """Receives responses from the Gemini API and forwards them to the client, looping until turn is complete."""
                try:
                    while True:
                        try:
                            print("receiving from gemini")
                            async for response in session.receive():
                                # first_response = True
                                # print(f"response: {response}")
                                if response.server_content is None:
                                    if response.tool_call is not None:
                                        # handle the tool call
                                        print(f"Tool call received: {response.tool_call}")

                                        function_calls = response.tool_call.function_calls
                                        function_responses = []

                                        for function_call in function_calls:
                                            name = function_call.name
                                            args = function_call.args
                                            # Extract the numeric part from Gemini's function call ID
                                            call_id = function_call.id

                                            # Validate function name
                                            if name == "set_light_values":
                                                try:
                                                    result = set_light_values(int(args["brightness"]),
                                                                              args["color_temp"])
                                                    function_responses.append(
                                                        {
                                                            "name": name,
                                                            # "response": {"result": "The light is broken."},
                                                            "response": {"result": result},
                                                            "id": call_id
                                                        }
                                                    )
                                                    await client_websocket.send(
                                                        json.dumps({"text": json.dumps(function_responses)}))
                                                    print("Function executed")
                                                except Exception as e:
                                                    print(f"Error executing function: {e}")
                                                    continue

                                        # Send function response back to Gemini
                                        print(f"function_responses: {function_responses}")
                                        await session.send(function_responses)
                                        continue

                                    # print(f'Unhandled server message! - {response}')
                                    # continue

                                model_turn = response.server_content.model_turn
                                if model_turn:
                                    for part in model_turn.parts:
                                        # print(f"part: {part}")
                                        if hasattr(part, 'text') and part.text is not None:
                                            # print(f"text: {part.text}")
                                            await client_websocket.send(json.dumps({"text": part.text}))
                                        elif hasattr(part, 'inline_data') and part.inline_data is not None:
                                            # if first_response:
                                            # print("audio mime_type:", part.inline_data.mime_type)
                                            # first_response = False
                                            base64_audio = base64.b64encode(part.inline_data.data).decode('utf-8')
                                            await client_websocket.send(json.dumps({
                                                "audio": base64_audio,
                                            }))
                                            print("audio received")

                                if response.server_content.turn_complete:
                                    print('\n<Turn complete>')
                        except websockets.exceptions.ConnectionClosedOK:
                            print("Client connection closed normally (receive)")
                            break  # Exit the loop if the connection is closed
                        except Exception as e:
                            print(f"Error receiving from Gemini: {e}")
                            break  # exit the lo

                except Exception as e:
                    print(f"Error receiving from Gemini: {e}")
                finally:
                    print("Gemini connection closed (receive)")

            # Start send loop
            send_task = asyncio.create_task(send_to_gemini())
            # Launch receive loop as a background task
            receive_task = asyncio.create_task(receive_from_gemini())
            await asyncio.gather(send_task, receive_task)


    except Exception as e:
        print(f"Error in Gemini session: {e}")
    finally:
        print("Gemini session closed.")


async def main() -> None:
    async with websockets.serve(gemini_session_handler, "localhost", 9082):
        print("Running websocket server localhost:9082...")
        await asyncio.Future()  # Keep the server running indefinitely


if __name__ == "__main__":
    asyncio.run(main())