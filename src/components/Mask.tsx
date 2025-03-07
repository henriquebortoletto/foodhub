import React from 'react'
import { IMaskInput } from 'react-imask'
import type { InputBaseComponentProps } from '@mui/material'

export const Mask = React.forwardRef<
  HTMLInputElement,
  InputBaseComponentProps & {
    mask: string
  }
>(({ mask, onChange, ...props }, ref) => (
  <IMaskInput
    {...props}
    overwrite
    mask={mask}
    inputRef={ref}
    onAccept={(value: string) =>
      onChange?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
    }
  />
))
