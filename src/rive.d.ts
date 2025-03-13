declare module '@rive-app/react-canvas' {
  export function useRive(props: RiveProps): { RiveComponent: React.ComponentType };
  interface RiveProps {
    src?: string;
    artboard?: string;
    stateMachines?: string | string[];
    autoplay?: boolean;
  }
}