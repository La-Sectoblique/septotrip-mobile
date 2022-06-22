import { getTripFiles } from "@la-sectoblique/septoblique-service";
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { FileList } from "../trip/FileList";
import { useTranslation } from "react-i18next";

interface StepDetailsProps {
  step: StepOutput;
}


export const StepDetails = ({step}: StepDetailsProps) => {
  const { t, i18n } = useTranslation("locale");

  if (step == null) return <></>;

  const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[])

  useEffect(() => {
    getTripFiles(step.tripId, {step: step.id})
    .then((res: FileMetadataOutput[]) => setFiles(res))
  }, [])
  return (
    <View style={{width: Dimensions.get('window').width * 75 / 100}}>
      <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>{`${step.name}`}</Text>
      {
            files.length > 0 
            ? <FileList files={files} showWebView={false}/>
            // eslint-disable-next-line react/no-unescaped-entities
            : <Text style={{textAlign: "center", margin: 5}}>{t("trip.stepNoFile")}</Text>
      }
    </View>
  );
};
