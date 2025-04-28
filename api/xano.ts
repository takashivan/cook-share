import { XanoClient } from "@xano/js-sdk/lib";

const realTimeClient = new XanoClient({
  instanceBaseUrl: process.env.NEXT_PUBLIC_XANO_BASE_URL || '',
  realtimeConnectionHash: process.env.NEXT_PUBLIC_XANO_REALTIME_HASH || '',
});

export default realTimeClient;
