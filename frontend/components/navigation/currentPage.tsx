'use client'

import { setCookie, parseCookies } from 'nookies';

export function SetCurrentPage(page: string) {
  setCookie(null, "currentPage", page, { path: "/" });
}

export function GetCurrentPage() {
  const cookies = parseCookies();
  return cookies.currentPage;
}