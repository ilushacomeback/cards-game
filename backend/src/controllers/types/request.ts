import { FastifyRequest, RouteGenericInterface } from 'fastify';

interface MyCookies {
  access?: string;
  refresh?: string;
}

export type TypedRequest<T extends RouteGenericInterface = RouteGenericInterface> =
  FastifyRequest<T> & { cookies: MyCookies };
