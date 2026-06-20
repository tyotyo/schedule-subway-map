import {
  Plus,
  Shuffle,
  Trash2,
  X,
  Grid3x3,
  Maximize,
  PanelLeftOpen,
  Download,
  ArrowRight,
  Map,
  Play,
} from "lucide-react";

/**
 * Icon — thin wrapper that keeps the handoff's `<Icon name="plus" size={16} />`
 * call shape while drawing from lucide-react instead of the UMD Lucide + Lic
 * helper the prototypes used. Kebab name → component.
 */
const REGISTRY = {
  plus: Plus,
  shuffle: Shuffle,
  "trash-2": Trash2,
  x: X,
  "grid-3x3": Grid3x3,
  maximize: Maximize,
  "panel-left-open": PanelLeftOpen,
  download: Download,
  "arrow-right": ArrowRight,
  map: Map,
  play: Play,
};

export function Icon({ name, size = 16, color = "currentColor", strokeWidth = 2, ...rest }) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp size={size} color={color} strokeWidth={strokeWidth} {...rest} />;
}
