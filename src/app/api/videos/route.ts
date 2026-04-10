import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const API_TOKEN = "adb3ca178449bc63c7ecbb66";

    const query = request.nextUrl.searchParams.toString();
    const url =
      "https://rpmshare.com/api/v1/video/manage" +
      (query ? `?${query}` : "");

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
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
