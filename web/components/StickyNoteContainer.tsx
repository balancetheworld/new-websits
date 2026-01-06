import { IoLocationOutline } from 'react-icons/io5'
import StickyNote from '@/components/sticky-note'

export default function StickyNoteContainer() {
  return (
    <>
      <StickyNote initialPosition={{ x: '33vw', y: '60vh' }} initialText="Hello!" color="yellow" />
      <StickyNote initialPosition={{ x: '60%', y: '11%' }} color="pink">
        <div className="text-5xl mb-2">🥳</div>
      </StickyNote>
      <StickyNote initialPosition={{ x: '33vw', y: '26%' }} initialText="CQUPT student" color="yellow" />
      <StickyNote initialPosition={{ x: '39.5%', y: '27%' }} initialText="redrock team" color="purple" />
      <StickyNote initialPosition={{ x: '37%', y: '30%' }} color="pink">
        <div>love with snowykami</div>
      </StickyNote>
      <StickyNote initialPosition={{ x: '31vw', y: '29%' }} color="green">
        <div className="flex flex-col items-center">
          <IoLocationOutline className="text-3xl mb-2 font-custom" />
          <span className="text-lg">ChongQing</span>
        </div>
      </StickyNote>
      {/* ...更多 */}
    </>
  )
}
