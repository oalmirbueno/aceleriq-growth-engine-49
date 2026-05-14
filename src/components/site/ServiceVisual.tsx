import { MacBookHero } from "./heroes/MacBookHero";
import { RobotHero } from "./heroes/RobotHero";
import { DashboardHero } from "./heroes/DashboardHero";
import { AgenciaHero } from "./heroes/AgenciaHero";

export type ServiceVariant = "sites" | "trafego" | "ia" | "agencia";

/**
 * Dispatches to a 3D, "alive" hero per service variant.
 * No square framed screenshots, no code shots.
 */
export function ServiceVisual({ variant }: { variant: ServiceVariant }) {
  if (variant === "sites") return <MacBookHero />;
  if (variant === "ia") return <RobotHero />;
  if (variant === "trafego") return <DashboardHero />;
  return <AgenciaHero />;
}
