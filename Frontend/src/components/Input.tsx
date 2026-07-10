import { forwardRef } from "react";

interface BaseProps {
  placeholder: string;
}

type TextareaProps = BaseProps & {
  type: "textarea";
  ref?: React.Ref<HTMLTextAreaElement>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

type InputProps = BaseProps & {
  type?: "text" | "password"; 
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

type Props = TextareaProps | InputProps;

export const InputComponent = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  Props
>((props, ref) => {
  const { placeholder, type = "text", ...rest } = props;
  const baseClasses = `w-full px-4 py-2.5 rounded-xl 
                       border border-ink/10 
                       text-sm text-ink 
                       bg-white/40 backdrop-blur-sm
                       placeholder-ink/30 placeholder:text-sm
                       focus:outline-none focus:ring-1 
                       focus:ring-ink focus:border-transparent
                       transition-all duration-150`;

  if (type === "textarea") {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        placeholder={placeholder}
        className={`${baseClasses} min-h-[100px] resize-vertical`}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <input
      ref={ref as React.Ref<HTMLInputElement>}
      type={type}
      placeholder={placeholder}
      className={baseClasses}
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );
});

InputComponent.displayName = "InputComponent";
