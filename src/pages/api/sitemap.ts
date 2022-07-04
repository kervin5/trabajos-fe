import { SitemapStream, streamToPromise } from 'sitemap';

import glob from 'glob';
import fs from 'fs';
import path from 'path';
import { getPublishedJobs, getJobUrl } from 'src/lib/jobs';
import { NextApiRequest, NextApiResponse } from 'next';

const SITE_ROOT = process.env.NEXT_PUBLIC_APP_URL as string;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);
const SOURCE = process.env.SOURCE || path.join(resolveApp('src/pages'), '/**/!(_*).tsx');

console.log('SOURCE', SOURCE);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/xml');
  try {
    const jobs = await getPublishedJobs(); // call the backend and fetch all jobs

    const smStream = new SitemapStream({
      hostname: 'https://' + req.headers.host,
    });

    const diskPages = glob.sync(SOURCE);

    diskPages.forEach((page) => {
      if (!page.includes('[') && !page.includes('dashboard') && !page.includes('api')) {
        const stats = fs.statSync(page);
        const modDate = new Date(stats.mtime);
        const lastMod = `${modDate.getFullYear()}-${('0' + (modDate.getMonth() + 1)).slice(-2)}-${(
          '0' + modDate.getDate()
        ).slice(-2)}`;
        console.log('page', page);
        page = page.replace(resolveApp('pages'), '');
        page = page.replace(/.tsx$/, '');
        page = page.split('/pages').pop() as string;
        page = `${SITE_ROOT}${page}`;
        // page = page.trimRight("/");

        if (page.match(/.*\/index$/)) {
          page = page.replace('/index', '');
        }

        smStream.write({
          url: page,
          lastmod: lastMod,
        });
      }
    });

    for (const job of jobs) {
      smStream.write({
        url: `${SITE_ROOT}${getJobUrl(job)}`,
        lastmod: job.updatedAt,
      });
    }

    smStream.end();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sitemap = await streamToPromise(smStream).then((sm: any) => sm.toString());
    res.write(sitemap);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
}
