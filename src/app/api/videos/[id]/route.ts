import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const API_TOKEN = "adb3ca178449bc63c7ecbb66";

    const url = `https://rpmshare.com/api/v1/video/manage/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-token": API_TOKEN,
        "accept": "application/json"
      }
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Proxy error",
        message: err.message
      },
      { status: 500 }
    );
  }
}
