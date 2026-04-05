'use client';

import { useEffect, useRef, useState } from 'react';
import { NOW_EDITING_PROJECTS } from '@/lib/data';

export default function NowEditing() {
  const [project, setProject] = useState(NOW_EDITING_PROJECTS[0]);
  const [visible, setVisible] = useState(true);
  const idx = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        idx.current = (idx.current + 1) % NOW_EDITING_PROJECTS.length;
        setProject(NOW_EDITING_PROJECTS[idx.current]);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="now-editing">
      <span className="ne-dot" />
      <span className="ne-label">Now Editing</span>
      <span className="ne-divider" />
      <span className="ne-project" style={{ opacity: visible ? 1 : 0 }}>{project}</span>
    </div>
  );
}
