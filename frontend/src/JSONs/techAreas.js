export const techAreas = [
        {
          title: "Operational Efficiency",
          defaultInfo: [
            { icon: '📊', title: 'Type Of Use', options: ['Everyday', 'Augment', 'Transform'] },
            { icon: '🧹', title: 'Type Of App', options: ['Content', 'Delivery', 'Triage', 'End to End Decisions'] },
            { icon: '🔒', title: 'Quadrant Mapping', options: ['Quadrant-1', 'Quadrant-2', 'Quadrant-3'] },
          ],
          questions: [
            {
              id: 'dataVolume',
              label: 'What do you think is the volume of data the organization has available for this application?',
              options: [
                { value: 'extensive', label: 'Extensive data (petabytes or more)' },
                { value: 'large', label: 'Large data volume (terabytes)' },
                { value: 'moderate', label: 'Moderate data volume (gigabytes)' },
                { value: 'small', label: 'Small but manageable data volume (megabytes)' },
                { value: 'limited', label: 'Limited data availability (kilobytes or less)' },
              ],
            },
            {
              id: 'dataQuality',
              label: 'What do you think is the quality of data the organization has available?',
              options: [
                { value: 'high', label: 'High quality, well-curated data' },
                { value: 'good', label: 'Good quality with minor inconsistencies' },
                { value: 'average', label: 'Average quality, requires some cleaning' },
                { value: 'low', label: 'Poor quality, significant preprocessing needed' },
              ],
            },
            {
                id: 'dataSensitivity',
                label: 'What do you think is the sensitivity of the data that will be used?',
                options: [
                  { value: 'high', label: ' Highly sensitive (e.g., personally identifiable information)' },
                  { value: 'good', label: 'Generally sensitive (e.g., financial records)' },
                  { value: 'average', label: 'Moderately sensitive(e.g., internal business documents)' },
                  { value: 'low', label: 'Low sensitive (e.g., public-facing content)' },
                  { value: 'not', label: 'Not sensitive (e.g., anonymized or aggregated data)' },
                ],
              },
              {
                id: 'accuracyTolerance',
                label: "What is the accuracy tolerance for the application's output for this use case?",
                options: [
                  { value: 'high', label: 'Zero tolerance for errors (critical systems)' },
                  { value: 'good', label: 'Very high accuracy required (above 95%)' },
                  { value: 'average', label: 'Moderate accuracy required (80-95%)' },
                  { value: 'low', label: 'Some tolerance for inaccuracies (60-80%)' },
                  { value: 'not', label: 'High tolerance for inaccuracies (below 60%)' },
                ],
              }
          ],
        },
        {
            title: "Customer Value",
            defaultInfo: [
              { icon: '📊', title: 'Type Of Use', options: ['Everyday', 'Augment', 'Transform'] },
              { icon: '🧹', title: 'Type Of App', options: ['Content', 'Delivery', 'Triage', 'End to End Decisions'] },
              { icon: '🔒', title: 'Quadrant Mapping', options: ['Quadrant-1', 'Quadrant-2', 'Quadrant-3'] },
            ],
            questions: [
              {
                id: 'dataVolume',
                label: 'What do you think is the volume of data the organization has available for this application?',
                options: [
                  { value: 'extensive', label: 'Extensive data (petabytes or more)' },
                  { value: 'large', label: 'Large data volume (terabytes)' },
                  { value: 'moderate', label: 'Moderate data volume (gigabytes)' },
                  { value: 'small', label: 'Small but manageable data volume (megabytes)' },
                  { value: 'limited', label: 'Limited data availability (kilobytes or less)' },
                ],
              },
              {
                id: 'dataQuality',
                label: 'What do you think is the quality of data the organization has available?',
                options: [
                  { value: 'high', label: 'High quality, well-curated data' },
                  { value: 'good', label: 'Good quality with minor inconsistencies' },
                  { value: 'average', label: 'Average quality, requires some cleaning' },
                  { value: 'low', label: 'Poor quality, significant preprocessing needed' },
                ],
              },
              {
                  id: 'dataSensitivity',
                  label: 'What do you think is the sensitivity of the data that will be used?',
                  options: [
                    { value: 'high', label: ' Highly sensitive (e.g., personally identifiable information)' },
                    { value: 'good', label: 'Generally sensitive (e.g., financial records)' },
                    { value: 'average', label: 'Moderately sensitive(e.g., internal business documents)' },
                    { value: 'low', label: 'Low sensitive (e.g., public-facing content)' },
                    { value: 'not', label: 'Not sensitive (e.g., anonymized or aggregated data)' },
                  ],
                },
                {
                  id: 'accuracyTolerance',
                  label: "What is the accuracy tolerance for the application's output for this use case?",
                  options: [
                    { value: 'high', label: 'Zero tolerance for errors (critical systems)' },
                    { value: 'good', label: 'Very high accuracy required (above 95%)' },
                    { value: 'average', label: 'Moderate accuracy required (80-95%)' },
                    { value: 'low', label: 'Some tolerance for inaccuracies (60-80%)' },
                    { value: 'not', label: 'High tolerance for inaccuracies (below 60%)' },
                  ],
                }
            ],
          },
          {
            title: "Competitive Advantage",
            defaultInfo: [
              { icon: '📊', title: 'Type Of Use', options: ['Everyday', 'Augment', 'Transform'] },
              { icon: '🧹', title: 'Type Of App', options: ['Content', 'Delivery', 'Triage', 'End to End Decisions'] },
              { icon: '🔒', title: 'Quadrant Mapping', options: ['Quadrant-1', 'Quadrant-2', 'Quadrant-3'] },
            ],
            questions: [
              {
                id: 'dataVolume',
                label: 'What do you think is the volume of data the organization has available for this application?',
                options: [
                  { value: 'extensive', label: 'Extensive data (petabytes or more)' },
                  { value: 'large', label: 'Large data volume (terabytes)' },
                  { value: 'moderate', label: 'Moderate data volume (gigabytes)' },
                  { value: 'small', label: 'Small but manageable data volume (megabytes)' },
                  { value: 'limited', label: 'Limited data availability (kilobytes or less)' },
                ],
              },
              {
                id: 'dataQuality',
                label: 'What do you think is the quality of data the organization has available?',
                options: [
                  { value: 'high', label: 'High quality, well-curated data' },
                  { value: 'good', label: 'Good quality with minor inconsistencies' },
                  { value: 'average', label: 'Average quality, requires some cleaning' },
                  { value: 'low', label: 'Poor quality, significant preprocessing needed' },
                ],
              },
              {
                  id: 'dataSensitivity',
                  label: 'What do you think is the sensitivity of the data that will be used?',
                  options: [
                    { value: 'high', label: ' Highly sensitive (e.g., personally identifiable information)' },
                    { value: 'good', label: 'Generally sensitive (e.g., financial records)' },
                    { value: 'average', label: 'Moderately sensitive(e.g., internal business documents)' },
                    { value: 'low', label: 'Low sensitive (e.g., public-facing content)' },
                    { value: 'not', label: 'Not sensitive (e.g., anonymized or aggregated data)' },
                  ],
                },
                {
                  id: 'accuracyTolerance',
                  label: "What is the accuracy tolerance for the application's output for this use case?",
                  options: [
                    { value: 'high', label: 'Zero tolerance for errors (critical systems)' },
                    { value: 'good', label: 'Very high accuracy required (above 95%)' },
                    { value: 'average', label: 'Moderate accuracy required (80-95%)' },
                    { value: 'low', label: 'Some tolerance for inaccuracies (60-80%)' },
                    { value: 'not', label: 'High tolerance for inaccuracies (below 60%)' },
                  ],
                }
            ],
          },
          {
            title: "Innovation",
            defaultInfo: [
              { icon: '📊', title: 'Type Of Use', options: ['Everyday', 'Augment', 'Transform'] },
              { icon: '🧹', title: 'Type Of App', options: ['Content', 'Delivery', 'Triage', 'End to End Decisions'] },
              { icon: '🔒', title: 'Quadrant Mapping', options: ['Quadrant-1', 'Quadrant-2', 'Quadrant-3'] },
            ],
            questions: [
              {
                id: 'dataVolume',
                label: 'What do you think is the volume of data the organization has available for this application?',
                options: [
                  { value: 'extensive', label: 'Extensive data (petabytes or more)' },
                  { value: 'large', label: 'Large data volume (terabytes)' },
                  { value: 'moderate', label: 'Moderate data volume (gigabytes)' },
                  { value: 'small', label: 'Small but manageable data volume (megabytes)' },
                  { value: 'limited', label: 'Limited data availability (kilobytes or less)' },
                ],
              },
              {
                id: 'dataQuality',
                label: 'What do you think is the quality of data the organization has available?',
                options: [
                  { value: 'high', label: 'High quality, well-curated data' },
                  { value: 'good', label: 'Good quality with minor inconsistencies' },
                  { value: 'average', label: 'Average quality, requires some cleaning' },
                  { value: 'low', label: 'Poor quality, significant preprocessing needed' },
                ],
              },
              {
                  id: 'dataSensitivity',
                  label: 'What do you think is the sensitivity of the data that will be used?',
                  options: [
                    { value: 'high', label: ' Highly sensitive (e.g., personally identifiable information)' },
                    { value: 'good', label: 'Generally sensitive (e.g., financial records)' },
                    { value: 'average', label: 'Moderately sensitive(e.g., internal business documents)' },
                    { value: 'low', label: 'Low sensitive (e.g., public-facing content)' },
                    { value: 'not', label: 'Not sensitive (e.g., anonymized or aggregated data)' },
                  ],
                },
                {
                  id: 'accuracyTolerance',
                  label: "What is the accuracy tolerance for the application's output for this use case?",
                  options: [
                    { value: 'high', label: 'Zero tolerance for errors (critical systems)' },
                    { value: 'good', label: 'Very high accuracy required (above 95%)' },
                    { value: 'average', label: 'Moderate accuracy required (80-95%)' },
                    { value: 'low', label: 'Some tolerance for inaccuracies (60-80%)' },
                    { value: 'not', label: 'High tolerance for inaccuracies (below 60%)' },
                  ],
                }
            ],
          },
          {
            title: "Market Share",
            defaultInfo: [
              { icon: '📊', title: 'Type Of Use', options: ['Everyday', 'Augment', 'Transform'] },
              { icon: '🧹', title: 'Type Of App', options: ['Content', 'Delivery', 'Triage', 'End to End Decisions'] },
              { icon: '🔒', title: 'Quadrant Mapping', options: ['Quadrant-1', 'Quadrant-2', 'Quadrant-3'] },
            ],
            questions: [
              {
                id: 'dataVolume',
                label: 'What do you think is the volume of data the organization has available for this application?',
                options: [
                  { value: 'extensive', label: 'Extensive data (petabytes or more)' },
                  { value: 'large', label: 'Large data volume (terabytes)' },
                  { value: 'moderate', label: 'Moderate data volume (gigabytes)' },
                  { value: 'small', label: 'Small but manageable data volume (megabytes)' },
                  { value: 'limited', label: 'Limited data availability (kilobytes or less)' },
                ],
              },
              {
                id: 'dataQuality',
                label: 'What do you think is the quality of data the organization has available?',
                options: [
                  { value: 'high', label: 'High quality, well-curated data' },
                  { value: 'good', label: 'Good quality with minor inconsistencies' },
                  { value: 'average', label: 'Average quality, requires some cleaning' },
                  { value: 'low', label: 'Poor quality, significant preprocessing needed' },
                ],
              },
              {
                  id: 'dataSensitivity',
                  label: 'What do you think is the sensitivity of the data that will be used?',
                  options: [
                    { value: 'high', label: ' Highly sensitive (e.g., personally identifiable information)' },
                    { value: 'good', label: 'Generally sensitive (e.g., financial records)' },
                    { value: 'average', label: 'Moderately sensitive(e.g., internal business documents)' },
                    { value: 'low', label: 'Low sensitive (e.g., public-facing content)' },
                    { value: 'not', label: 'Not sensitive (e.g., anonymized or aggregated data)' },
                  ],
                },
                {
                  id: 'accuracyTolerance',
                  label: "What is the accuracy tolerance for the application's output for this use case?",
                  options: [
                    { value: 'high', label: 'Zero tolerance for errors (critical systems)' },
                    { value: 'good', label: 'Very high accuracy required (above 95%)' },
                    { value: 'average', label: 'Moderate accuracy required (80-95%)' },
                    { value: 'low', label: 'Some tolerance for inaccuracies (60-80%)' },
                    { value: 'not', label: 'High tolerance for inaccuracies (below 60%)' },
                  ],
                }
            ],
          },
      ];