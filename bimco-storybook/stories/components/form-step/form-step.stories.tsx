import { Meta, StoryObj } from '@storybook/html';
import { PropsWithChildren } from 'jsx-dom';
import { FormStep, FormStepProps } from './form-step';
import { CheckboxInput } from '../../elements/form-control/checkbox-input/checkbox-input';
import { TextInput } from '../../elements/form-control/text-input/text-input';
import { DropdownSelect } from '../../elements/form-control/dropdown-select/dropdown-select';
import { DateInput } from '../../elements/form-control/date-input/date-input';
import { Base as TextInputBase, Password as TextInputPassword, Textarea } from '../../elements/form-control/text-input/text-input.stories';
import { Base as DropdownBase, Multiple as DropdownMultiple } from '../../elements/form-control/dropdown-select/dropdown-select.stories';
import { Base as DateInputBase } from '../../elements/form-control/date-input/date-input.stories';
import { DataConsent as CheckboxDataConsent } from '../../elements/form-control/checkbox-input/checkbox-input.stories';

const meta: Meta<FormStepProps> = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Components/Form Step',
  tags: ['autodocs'],
  component: FormStep
}

export default meta;
type Story = StoryObj<PropsWithChildren<FormStepProps>>;

export const FormStepBaseChildren = [
  TextInput({ ...TextInputBase.args }),
  DropdownSelect({ ...DropdownBase.args }),
  DropdownSelect({ ...DropdownMultiple.args }),
  TextInput({ ...Textarea.args }),
  TextInput({ ...TextInputPassword.args }),
  DateInput({ ...DateInputBase.args }),
  CheckboxInput({ ...CheckboxDataConsent.args })
];

export const Base: Story = {
  render: (args) => FormStep({...args, children: FormStepBaseChildren}),
  args: {
    stepname: 'Your Details',
    steps: 7,
    stepsCompleted: 1
  }
};
  