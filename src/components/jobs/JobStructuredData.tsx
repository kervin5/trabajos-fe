import React from "react";
import { Job } from "src/generated/graphql";

const JobStructuredData = ({
  job: { title, content, updatedAt, location },
}: {
  job: Pick<Job, "title" | "content" | "updatedAt" | "location">;
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: `{
      "@context": "http://schema.org/",
      "@type": "JobPosting",
      "title": "${title}",
      "description": "${content
        .map((c) => c.plainText)
        .join(" ")
        .replace(/"/g, '\\"')}",
      "datePosted": "${updatedAt}",
      "employmentType": "Tiempo completo",
      "industry": "Profesional",
      "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "${location?.name.split(",")[0]}",
            "addressRegion": "${location?.name.split(",")[1]}"
          }
        },
        "hiringOrganization": "Jobs"
    }`,
    }}
  />
);

// const JobStructuredData = ({
//     title,
//     description,
//     updatedAt,
//     type,
//     categories,
//     location,
//     minCompensation,
//     company,
//   }: Job) => (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{
//         __html: `{
//         "@context": "http://schema.org/",
//         "@type": "JobPosting",
//         "title": "${title}",
//         "description": "${description.replace(/\"/g, '\\"')}",
//         "datePosted": "${updatedAt}",
//         "employmentType": "${type}",
//         "baseSalary": ${minCompensation},
//         "industry": "${categories.map((category) => category.name).join(",")}",
//         "jobLocation": {
//             "@type": "Place",
//             "address": {
//               "@type": "PostalAddress",
//               "addressLocality": "${location.split(",")[0]}",
//               "addressRegion": "${location.split(",")[1]}"
//             }
//           },
//           "hiringOrganization": "${company}"
//       }`,
//       }}
//     />
//   );

export default JobStructuredData;
