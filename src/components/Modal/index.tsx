import * as Dialog from '@/components/Modal/Base'
import { FormDialog } from '@/components/Form/Dialog'

export const Modal = () => (
  <Dialog.Root>
    <Dialog.Open />
    <Dialog.Trigger>
      <Dialog.Content title="Adicionar Restaurante">
        <FormDialog />
      </Dialog.Content>
      <Dialog.Actions />
    </Dialog.Trigger>
  </Dialog.Root>
)
