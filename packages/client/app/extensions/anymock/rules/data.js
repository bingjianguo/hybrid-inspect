import fse, { outputFileSync, existsSync, readFileSync } from 'fs-extra';
import jschardet, { detect } from "jschardet";
import iconv, { decode } from 'iconv-lite';

export function genereteJsonResponse(file, responseDetail) {

  let { response } = responseDetail;
  const { statusCode } = response;
  // 数据接口情况
  if ( statusCode === 200 ) {
    const { encoding } =  detect(response.body);
    // console.log(encoding);
    outputFileSync(file, response.body);
    // if ( encoding.toLowerCase() == 'gbk' || encoding.toLowerCase() == 'gb2312' ) {
    //   fse.outputFileSync(file, iconv.decode(response.body, 'gbk'));
    // } else {
    //   fse.outputFileSync(file, response.body);
    // }
  } else {
    const bExist = existsSync(file);
    if ( bExist ) {
      let body = readFileSync(file);
      const statusCode = 200;
      const { encoding } =  detect(body);
      if ( encoding.toLowerCase() == 'gbk' || encoding.toLowerCase() == 'gb2312' ) {
        body = decode(body, 'gbk');
      }
      response = {
        ...response,
        body,
        statusCode
      };
    }
  }

  return { response };
}