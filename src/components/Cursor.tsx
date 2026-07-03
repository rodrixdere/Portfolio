import { useMagneticCursor } from '../hooks/useMagneticCursor'
import styles from './Cursor.module.css'

export default function Cursor() {
  const { cursorRef, followerRef } = useMagneticCursor()

  return (
    <>
      {/* Punto central — sigue el mouse inmediatamente */}
      <div ref={cursorRef} className={styles.cursor} />
      {/* Aro exterior — sigue con lag y se transforma en headline */}
      <div ref={followerRef} className={styles.follower} />
    </>
  )
}