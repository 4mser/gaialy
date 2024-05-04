export interface ContrastDataItem {
    [column: string]: number;
}

export interface ContrastData {
    [type: string]: ContrastDataItem[];
}

export const IqaContrast: ContrastData ={
    "Contrast":[
        {
         "Column1": 0.02,
         "Column2": 0.035,
         "Column3": 0.04,
         "Column4": 0.08,
         "Column5": 0.01,
         "Column6": 0.015,
         "Column7": 0.035,
         "Column8": 0.025,
         "Column9": 0.02
        },
        {
         "Column1": 0.022000000000000002,
         "Column2": 0.038500000000000006,
         "Column3": 0.044000000000000004,
         "Column4": 0.08800000000000001,
         "Column5": 0.011000000000000001,
         "Column6": 0.0165,
         "Column7": 0.038500000000000006,
         "Column8": 0.027500000000000004,
         "Column9": 0.022000000000000002
        },
        {
         "Column1": 0.0198,
         "Column2": 0.03465000000000001,
         "Column3": 0.0396,
         "Column4": 0.0792,
         "Column5": 0.0099,
         "Column6": 0.01485,
         "Column7": 0.03465000000000001,
         "Column8": 0.024750000000000005,
         "Column9": 0.0198
        }
    ],
        "Shading": [
            {
             "Column1": 0.02,
             "Column2": 0.018,
             "Column3": 0.045,
             "Column4": 0.025,
             "Column5": 0.055,
             "Column6": 0.05,
             "Column7": 0.022,
             "Column8": 0.011,
             "Column9": 0.02
            },
            {
             "Column1": 0.024,
             "Column2": 0.021599999999999998,
             "Column3": 0.054,
             "Column4": 0.03,
             "Column5": 0.066,
             "Column6": 0.06,
             "Column7": 0.026399999999999996,
             "Column8": 0.013199999999999998,
             "Column9": 0.024
            },
            {
             "Column1": 0.0196,
             "Column2": 0.01764,
             "Column3": 0.0441,
             "Column4": 0.0245,
             "Column5": 0.053899999999999997,
             "Column6": 0.049,
             "Column7": 0.02156,
             "Column8": 0.01078,
             "Column9": 0.0196
            }
        ],
        "Exposure": [
            {
             "Column1": 0.35,
             "Column2": 0.15,
             "Column3": 0.35,
             "Column4": 0.22,
             "Column5": 0.35,
             "Column6": 0.25,
             "Column7": 0.2,
             "Column8": 0.12,
             "Column9": 0.25
            },
            {
             "Column1": 0.3388,
             "Column2": 0.1452,
             "Column3": 0.3388,
             "Column4": 0.21295999999999998,
             "Column5": 0.3388,
             "Column6": 0.242,
             "Column7": 0.1936,
             "Column8": 0.11615999999999999,
             "Column9": 0.242
            },
            {
             "Column1": 0.3279584,
             "Column2": 0.1405536,
             "Column3": 0.3279584,
             "Column4": 0.20614528,
             "Column5": 0.3279584,
             "Column6": 0.234256,
             "Column7": 0.18740479999999998,
             "Column8": 0.11244287999999998,
             "Column9": 0.234256
            }
        ]
    }