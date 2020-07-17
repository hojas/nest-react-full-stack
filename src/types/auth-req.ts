import { Req } from '@nestjs/common';

type ReqType = typeof Req;

export type GithubUser = {
  user: any;
};

export type AuthReq = ReqType & GithubUser;
