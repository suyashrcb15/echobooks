import type { NextConfig } from "next";
import {hostname} from "node:os";

const nextConfig: NextConfig = {
  /* config options here */
    images:{
        remotePatterns:[
            {protocol: 'https', hostname: 'covers.openlibrary.org'},
            {protocol: 'https', hostname: 'owpiqksqqsmcz8s6.public.blob.vercel-storage.com'},
        ]
    }
};

export default nextConfig;
