import { Context } from './context';
import * as trpc from '@trpc/server';

export const createRouter = () => trpc.router<Context>();
