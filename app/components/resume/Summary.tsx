import React from 'react'

import ScoreGauge from "~/components/dynamicgauge/ScoreGauge";
import ScoreBadge from "~/components/resume/ScoreBadge";

const Category = ({ title, score }: {title: string, score: number }) => {
    const textColor = score > 70 ? "text-green-700" : score > 49 ? "text-yellow-600" : "text-red-600";
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-3 items-center py-1">
                    <p className="text-[18px] md:text-xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-md md:text-2xl py-1">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: {feedback: Feedback}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row max-md:flex-col-reverse items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">This Score is calculated based on the variables listed below</p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}

export default Summary