import React, { useState } from 'react';
import Statistics from './Statistics/Statistics';
import countPositiveFeedbackPercentage from 'components/helpers/countPositiveFeedbackPercentage';
import countTotalFeedback from 'components/helpers/countTotalFeedback';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification ';
import PropTypes from 'prop-types';

export const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const handleLeaveFeedback = feedbackType => {
        setFeedback(prevFeedback => ({
            ...prevFeedback,
            [feedbackType]: prevFeedback[feedbackType] + 1,
        }));
    };

    const { good, neutral, bad } = feedback;
    const totalFeedback = countTotalFeedback(feedback);
    const positiveFeedback = countPositiveFeedbackPercentage(feedback);

    return (
        <div>
            <Section title="Leave Feedback">
                <FeedbackOptions
                    options={['good', 'neutral', 'bad']}
                    onLeaveFeedback={handleLeaveFeedback}
                />
            </Section>

            <Section title="Statistics">
                {totalFeedback > 0 ? (
                    <Statistics
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={totalFeedback}
                        positivePercentage={positiveFeedback}
                    />
                ) : (
                    <Notification message="There is no feedback" />
                )}
            </Section>
        </div>
    );
};

App.propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
};
