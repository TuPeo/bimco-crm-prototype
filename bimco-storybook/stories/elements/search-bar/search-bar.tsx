import * as React from 'jsx-dom';
import './search-bar.scss';
import '../form-control/text-input/text-input';
import '../button/button';
import { TextInput } from '../form-control/text-input/text-input';
import { Button } from '../button/button';

interface SearchBarArgs {
  placeholder: string;
  inputLabel: string;
  xRef?: string;
}

export const SearchBar = ({
  placeholder,
  inputLabel,
  xRef
}: SearchBarArgs) => {
  const barClasses = ["search-bar"];

  return <div class={barClasses} x-ref={xRef}>
    <div class="search-bar__input-col">
      <TextInput id="search" placeholder={ placeholder } />
    </div>
    <div class="search-bar__button-col">
      <Button type="primary" label={ inputLabel }/>
    </div>
  </div>
};
