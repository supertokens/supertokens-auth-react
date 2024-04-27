/// <reference types="react" />
export declare const ContinueWithPasswordlessFooter: React.FC<{
    onError: (err: string) => void;
    isPhoneNumber: boolean;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
}>;
