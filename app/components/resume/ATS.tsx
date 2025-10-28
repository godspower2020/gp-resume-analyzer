import React from "react";

const ATS = ({score, suggestions}: {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
    const classNames = [
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white px-4 py-6 md:p-8 flex flex-col gap-4",
        score > 69
            ? "from-green-100"
            : score > 49
                ? "from-yellow-100"
                : "from-red-100",
    ].join(" ");

    return (
        <div className={classNames}>
            <div className="flex flex-row gap-4 items-center">
                <img
                    src={
                        score > 69 ? "/icons/ats-good.svg" : score > 49
                                ? "/icons/ats-warning.svg"
                                : "/icons/ats-bad.svg"
                    }
                    alt="ATS"
                    className="w-10 h-10"
                />
                <p className="text-lg md:text-2xl font-semibold">ATS Score - {score}/100</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium text-md md:text-xl">
                    How well does your resume pass through Applicant Tracking Systems?
                </p>
                <p className="text-md md:text-lg text-gray-500 mb-2">
                    Your resume was scanned like an employer would. Here's how it
                    performed:
                </p>

                {suggestions.map((suggestion, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                suggestion.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="ATS"
                            className="w-4 h-4"
                        />
                        <p className="text-sm md:text-[16px] text-gray-500">{suggestion.tip}</p>
                    </div>
                ))}

                <p className="text-sm md:text-[16px] italic text-gray-500 mt-4">
                    Want a better score? Improve your resume by applying the suggestions
                    listed below.
                </p>
            </div>
        </div>
    );
};

export default ATS;
