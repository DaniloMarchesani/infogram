import { Moon, Sun } from 'lucide-react'
import React, {useContext} from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';

function ThemeSwitch() {
    const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Button isIconOnly className={clsx(theme === 'light' ? 'bg-yellow-200' : 'bg-purple-400')} onClick={toggleTheme}>
        {theme === "light" ? (
            <Sun />
        ) : (
            <Moon />
        )}
    </Button>
  )
}

export default ThemeSwitch