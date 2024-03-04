export interface LoginFormButtonProps {
  resended?: boolean;
  text: string;
  isLoading: boolean;
  onClick?: () => void;
  timeRemaining?: number;
  styles?: string;
}
