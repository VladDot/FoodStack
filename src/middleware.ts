// Для створення відповідей

import { routes } from '@/shared/constants';
import { authConfig } from '@/shared/lib/auth.config';

import NextAuth from 'next-auth';
import createIntlMiddleware from 'next-intl/middleware';
// Імпортуємо next-intl middleware
import { NextResponse } from 'next/server';

import { locales } from './shared/constants';

// Припускаємо, що тут твої локалі

const { auth } = NextAuth(authConfig);

// 1. Створюємо middleware для next-intl
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'uk', // Твоя дефолтна локаль
  localePrefix: 'never', // або "always", "as-needed" залежно від твоїх налаштувань
});

// 2. Експортуємо Auth.js middleware, який обгортає наш next-intl middleware
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // `req.auth` містить сесію, якщо користувач авторизований

  // Визначаємо, які маршрути є публічними (не потребують авторизації)
  const publicRoutes = [
    routes.auth.signIn,
    routes.auth.signUp,
    '/', // Головна сторінка може бути публічною
    // Додай сюди інші публічні маршрути
  ];

  // Перевіряємо, чи поточний маршрут є публічним
  const isPublicRoute = publicRoutes.some((route) => nextUrl.pathname.startsWith(route));

  // Якщо користувач не авторизований і намагається зайти на приватний маршрут
  if (!isLoggedIn && !isPublicRoute) {
    // Перенаправляємо на сторінку входу
    const redirectUrl = new URL(routes.auth.signIn, nextUrl.origin);
    // Можна додати `callbackUrl`, щоб після входу повернути користувача на сторінку, з якої він прийшов
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Якщо користувач авторизований і намагається зайти на сторінку входу/реєстрації,
  // перенаправляємо його на головну сторінку (або на /profile)
  if (
    isLoggedIn &&
    (nextUrl.pathname.startsWith(routes.auth.signIn) ||
      nextUrl.pathname.startsWith(routes.auth.signUp))
  ) {
    return NextResponse.redirect(new URL('/', nextUrl.origin));
  }

  // Якщо жодне з вищезазначених умов не спрацювало,
  // передаємо запит далі до next-intl middleware
  return intlMiddleware(req);
});

// 3. Конфігурація matcher
// `matcher` вказує Next.js, для яких шляхів запускати цей middleware.
// Цей шаблон ігнорує:
// - /api (API роути)
// - /_next (внутрішні файли Next.js)
// - /.*\\..* (файли зі статичними ресурсами, наприклад, .png, .jpg, .css, .js)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
