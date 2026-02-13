import { LandingHero } from "@/components/LandingHero";
import { HomepageSections } from "@/components/HomepageSections";
import { heroPagesBySlug } from "@/lib/landingHeroes";

export default function Home() {
  return (
    <>
      <LandingHero config={heroPagesBySlug["homepage-template"]} />
      <HomepageSections />
    </>
  );
}
