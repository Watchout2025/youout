import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const API_TOKEN = "adb3ca178449bc63c7ecbb66";

    // Direct proxy to the endpoint you provided
    const url = `https://rpmshare.com/api/v1/video/manage/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "api-token": API_TOKEN,
        "accept": "application/json"
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
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
