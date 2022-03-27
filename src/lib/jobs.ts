import axios from "axios";
import { Job } from "src/generated/graphql";
import { getBackendUrl } from "./api";

const jobFields = `
id
title
createdAt
updatedAt
content {
  id
  data
  type
  plainText
}
location {
  id
  name
}
`;

async function getJobsFeed() {
  const result = await axios.post(getBackendUrl(), {
    query: `{
        feed {
          ${jobFields}
        }
      }`,
  });

  return result.data.data.feed;
}

async function getJob(id: string) {
  try {
    const result = await axios.post(getBackendUrl(), {
      query: `{
        job(id: "${id}") {
            ${jobFields}
        } 
      }`,
    });
    return result.data.data.job;
  } catch (err: unknown) {
    return undefined;
  }
}

export function getJobUrl({
  title,
  location,
  id,
}: Pick<Job, "title" | "location" | "id">) {
  return `/jobs/${title.replace(/[\W_]+/g, "-")}-${location?.name.replace(
    /[\W_]+/g,
    "-"
  )}-ijid${id}`;
}

export function extractJobIdFromUrl(slug: string | undefined) {
  if (slug) {
    const slugParts = slug.split("-ijid");
    const jobId = slugParts[slugParts.length - 1];
    return jobId;
  }
  return "";
}

export { getJobsFeed, getJob };
