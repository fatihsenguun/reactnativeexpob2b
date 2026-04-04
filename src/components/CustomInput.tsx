import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  rightIconName?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  rightLabel?: string;
  onRightLabelPress?: () => void;
}

export default function CustomInput({
  label,
  iconName,
  rightIconName,
  onRightIconPress,
  rightLabel,
  onRightLabelPress,
  ...textInputProps // passes down value, onChangeText, placeholder, etc.
}: CustomInputProps) {
  return (
    <View className="space-y-2 mt-4">
      <View className="flex-row justify-between items-center ml-1">
        <Text className="text-xs font-bold uppercase tracking-widest text-outline">
          {label}
        </Text>
        {rightLabel && (
          <TouchableOpacity onPress={onRightLabelPress}>
            <Text className="text-[11px] font-bold text-primary">{rightLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="relative justify-center">
        <View className="absolute left-4 z-10">
          <MaterialIcons name={iconName} size={20} color="#767683" />
        </View>
        <TextInput
          className="w-full pl-12 pr-12 py-4 bg-surface-container-highest rounded-xl text-on-surface font-medium"
          placeholderTextColor="#767683"
          {...textInputProps}
        />
        {rightIconName && (
          <TouchableOpacity 
            className="absolute right-4 z-10 p-2"
            onPress={onRightIconPress}
          >
            <MaterialIcons name={rightIconName} size={20} color="#767683" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}