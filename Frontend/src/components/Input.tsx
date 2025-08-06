import { forwardRef } from 'react';

interface InputProps {
    placeholder: string;
    type?: string;
}

export const InputComponent = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ placeholder, type }, ref) => {
        const baseClasses = `w-full px-4 py-2 rounded-md 
                           border border-gray-300 
                           text-sm text-gray-800 
                           placeholder-gray-400 placeholder:text-sm
                           focus:outline-none focus:ring-2 
                           focus:ring-gray-400 focus:border-transparent`;

        if (type === "textarea") {
            return (
                <div>
                    <textarea
                        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
                        placeholder={placeholder}
                        className={`${baseClasses} min-h-[100px] resize-vertical`}
                        rows={4}
                    />
                </div>
            );
        }

        return (
            <div>
                <input
                    ref={ref as React.ForwardedRef<HTMLInputElement>}
                    type="text"
                    placeholder={placeholder}
                    className={baseClasses}
                />
            </div>
        );
    }
);

InputComponent.displayName = 'InputComponent';