import {forwardRef} from 'react';
import styles from './EmojiPicker.module.css'
import {
    activitiesEmoji,
    animalsAndNatureEmoji,
    facesAndEmotionEmoji,
    foodAndDrinkEmoji, objectsEmoji,
    peopleAndBodyEmoji, symbolsEmoji, travelAndPlacesEmoji
} from "../../constants/emojiList.ts";
interface EmojiPickerProps {
    handleEmojiClick: (emoji: string) => void,
}
const EmojiPicker = forwardRef<HTMLDivElement, EmojiPickerProps>(({handleEmojiClick}, ref) => {
    return (
        <div className={styles.emojiPicker} ref={ref}>
            <div className={styles.emojiPickerContent}>
                <h2>Faces & Emotion</h2>
                <div className={styles.emojiContainer}>
                    {facesAndEmotionEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>People & Body</h2>
                <div className={styles.emojiContainer}>
                    {peopleAndBodyEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Animals & Nature</h2>
                <div className={styles.emojiContainer}>
                    {animalsAndNatureEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Food & Drink</h2>
                <div className={styles.emojiContainer}>
                    {foodAndDrinkEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Activities</h2>
                <div className={styles.emojiContainer}>
                    {activitiesEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Travel & Places</h2>
                <div className={styles.emojiContainer}>
                    {travelAndPlacesEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Objects</h2>
                <div className={styles.emojiContainer}>
                    {objectsEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
                <h2>Symbols</h2>
                <div className={styles.emojiContainer}>
                    {symbolsEmoji.map(emoji => (
                        <button onClick={() => handleEmojiClick(emoji)} key={emoji}>{emoji}</button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default EmojiPicker;