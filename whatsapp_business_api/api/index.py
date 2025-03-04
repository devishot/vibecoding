from fastapi import FastAPI, HTTPException, Query, Response
from pydantic import BaseModel
from dotenv import load_dotenv
import requests
import uvicorn
import os

# Load environment variables from .env file
load_dotenv()

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

class PhoneNumberRequest(BaseModel):
    phoneNumber: str

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

class Contact(BaseModel):
    profile: dict
    wa_id: str

class Metadata(BaseModel):
    display_phone_number: str
    phone_number_id: str

class Message(BaseModel):
    from_: str = "from"
    id: str 
    timestamp: str
    text: dict
    type: str

class MessageValue(BaseModel):
    messaging_product: str
    metadata: Metadata
    contacts: list[Contact]
    messages: list[Message]

class Change(BaseModel):
    value: MessageValue
    field: str

class Entry(BaseModel):
    id: str
    changes: list[Change]

class WebhookRequest(BaseModel):
    object: str
    entry: list[Entry]

@app.get("/api/py/webhook")
async def verify_webhook(
    mode: str = Query(None, alias="hub.mode"),
    challenge: str = Query(None, alias="hub.challenge"), 
    verify_token: str = Query(None, alias="hub.verify_token")
):
    webhook_token = os.getenv("VERCEL_APP_WEBHOOK_VERIFY_TOKEN")
    if not verify_token:
        raise HTTPException(status_code=500, detail="Webhook token not found")

    if verify_token == webhook_token and mode == "subscribe":
        return Response(content=challenge, media_type="text/plain")
    
    raise HTTPException(status_code=403, detail="Invalid verify token")

@app.post("/api/py/webhook")
async def webhook(webhook_data: WebhookRequest):
    try:
        # Extract the sender's phone number from the first message
        if (webhook_data.entry and 
            webhook_data.entry[0].changes and 
            webhook_data.entry[0].changes[0].value.messages):
            
            receiver_phone = os.getenv("FACEBOOK_TEST_NUMBER_MINE")
            if not receiver_phone:
                raise HTTPException(status_code=500, detail="FACEBOOK_TEST_NUMBER_MINE not found")

            # Create request object with sender's number
            request = PhoneNumberRequest(phoneNumber=receiver_phone)

            # Call existing template sending function
            await send_whatsapp_template(request)

            return {
                "success": True,
                "message": f"Template sent to {receiver_phone}"
            }
        else:
            raise HTTPException(status_code=400, detail="Invalid webhook data format")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/api/py/sendtemplate")
async def send_template(request: PhoneNumberRequest):
    try:
        await send_whatsapp_template(request)

        return {
            "success": True,
            "message": f"Template sent to {request.phoneNumber}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def send_whatsapp_template(request: PhoneNumberRequest):
    try:
        
        facebook_token = os.getenv("FACEBOOK_BEARER_TOKEN")
        if not facebook_token:
            raise HTTPException(status_code=500, detail="Facebook token not found")

        url = "https://graph.facebook.com/v22.0/617331921454391/messages"
        
        headers = {
            "Authorization": f"Bearer {facebook_token}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "messaging_product": "whatsapp",
            "to": request.phoneNumber,
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        }

        response = requests.post(url, headers=headers, json=payload)
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"WhatsApp API error: {response.text}"
            )

        return {
            "success": True,
            "message": f"WhatsApp template sent to {request.phoneNumber}",
            "response": response.json()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3030))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port)

