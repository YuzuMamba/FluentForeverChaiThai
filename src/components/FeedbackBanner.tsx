import ChunkyButton from './ChunkyButton'
import AudioButton from './AudioButton'

interface Props {
  correct: boolean
  /** The right answer, shown when wrong (thai + roman + en). */
  answer?: { thai: string; roman?: string; en?: string }
  /** Extra explanation line (e.g. literal gloss). */
  detail?: string
  onContinue: () => void
}

const PRAISE = ['ยอดเยี่ยม! Excellent!', 'เก่งมาก! So good!', 'Perfect!', 'สุดยอด! Amazing!', 'แม่นมาก! Nailed it!']

/** Bottom feedback sheet after answering — Duolingo-grade clarity. */
export default function FeedbackBanner({ correct, answer, detail, onContinue }: Props) {
  const praise = PRAISE[Math.floor(Math.random() * PRAISE.length)]
  return (
    <div className={`feedback ${correct ? 'good' : 'bad'}`} role="status">
      <div className="feedback-inner">
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="feedback-title">
            <span style={{ fontSize: 28 }}>{correct ? '✅' : '❌'}</span>
            {correct ? praise : 'Not quite.'}
          </div>
          {!correct && answer && (
            <div className="feedback-detail" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <AudioButton thai={answer.thai} small />
              <span>
                <span className="thai" style={{ fontWeight: 600 }}>{answer.thai}</span>
                {answer.roman && <span style={{ color: 'var(--text-2)' }}> · {answer.roman}</span>}
                {answer.en && <span> — {answer.en}</span>}
              </span>
            </div>
          )}
          {detail && <div className="feedback-detail" style={{ marginTop: 4 }}>{detail}</div>}
        </div>
        <ChunkyButton
          variant={correct ? 'jade' : 'coral'}
          size="lg"
          onClick={onContinue}
          data-testid="continue"
          autoFocus
        >
          Continue
        </ChunkyButton>
      </div>
    </div>
  )
}
