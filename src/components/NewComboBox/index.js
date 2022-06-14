import React, {useState, useCallback, useMemo} from "react";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {Combobox} from "@headlessui/react";
import {mergeClassName, withComponentFactory} from "../../util/react";
import {omit} from "crocks";
import Nullable from '../Nullable';
import {putIntoArray} from "../../util/array";
import {asciifyLT} from '@s-e/frontend/transformer/string';
import Box from './Box';
import Label from './Label';
import InputContainer from './InputContainer';
import Input from './Input';
import Button from './Button';
import Options from './Options';
import Option from './Option';
import {withMergedClassName} from "../../util/react"

const ComboBox = withComponentFactory(Box, {
  // mapSetupInComponent: omit(["Option"]),
  Label,
  InputContainer,
  Input: withMergedClassName("w-full border border-gray-300 bg-white text-sm py-2 pl-3 pr-10 focus:outline-none", Input),
  Button,
  Options,
  Option,
  optionClassNameFn: ({active}) => `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "bg-red-900 text-white" : "text-gray-900"}`
});

export default ComboBox;
