import React from 'react'

interface ScoreBadgeProps {
    score: number
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeColor = '';
    let badgeText = '';

    if (score > 70) {
        badgeColor = 'bg-badge-green text-green-600';
        badgeText = 'Strong';
    } else if (score > 48) {
        badgeColor = 'bg-badge-yellow text-yellow-600';
        badgeText = 'Good Start';
    } else {
        badgeColor = 'bg-badge-red text-red-600';
        badgeText = 'Needs Work';
    }

    return (
        <div className={`px-2 py-0.5 rounded-md ${badgeColor}`}>
            <p className={`text-[10px] md:text-[12px] font-medium`}>{badgeText}</p>
        </div>
    )
}

export default ScoreBadge