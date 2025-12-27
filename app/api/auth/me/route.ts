import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api, ApiError } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function GET() {
  try {
    const cookiesData = await cookies();
    const { data } = await api.get(`/auth/me`, {
      headers: { Cookie: cookiesData.toString() },
    });
    return NextResponse.json(data);
  } catch (error) {
    const resErr = error as ApiError;
    return NextResponse.json(
      {
        error: resErr.response?.data?.error ?? resErr.message,
      },
      { status: resErr.status },
    );
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();
  try {
    const { data } = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as ApiError).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
