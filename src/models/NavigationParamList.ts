import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"

export type RootStackParamList= {
    Login: undefined,
    Register: undefined,
    Planification: { trip: TripOutput, isReadOnly: boolean },
    TripList: undefined,
    Parametres: {trip: TripOutput}
}


export type RootTabParamList= {
    Carte: { trip: TripOutput, pointToFocus?: PointOutput | StepOutput },
    Voyage: { trip: TripOutput },
    Planning: { trip: TripOutput },
    Tache: { trip: TripOutput },
    Fichier: { trip: TripOutput},
}