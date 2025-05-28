import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { customerNumber } = await req.json();          // E.164 string e.g. "+15551234567"
  const API_KEY = process.env.VAPI_API_KEY;
  const phoneNumberId = process.env.VAPI_PHONE_ID;
  const assistantId  = process.env.VAPI_ASSISTANT_ID;

  if (!customerNumber || !API_KEY || !assistantId || !phoneNumberId) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const payload = {
      phoneNumberId,
      assistantId,
      customer: { number: customerNumber }
    };

    const { data } = await axios.post(
      'https://api.vapi.ai/call/phone',               // Vapi outbound endpoint
      payload,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    return NextResponse.json({ ok: true, data });     // 201 if success
  } catch (err: any) {
    console.error(err?.response?.data || err);
    return NextResponse.json({ ok: false, err: err?.response?.data }, { status: 500 });
  }
}