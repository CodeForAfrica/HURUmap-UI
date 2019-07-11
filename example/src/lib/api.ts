import { Profile } from "./hurumap-dto";

export async function getProfile(geoId: string): Promise<Profile> {
  return fetch(`https://api.hurumap.org/profiles/${geoId}.json/`).then(res => {
    console.log(res.ok)
    if (!res.ok) {
      return;
    }
    return res.json();
  });
}
