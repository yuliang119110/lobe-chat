'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useImportConfig } from '@/hooks/useImportConfig';
import { ImportResults } from '@/services/config';

enum ImportState {
  Start,
  Loading,
  Finished,
  Close,
}

const AutoDataImporter = () => {
  const { t } = useTranslation('common');
  const { importConfig } = useImportConfig();
  const [duration, setDuration] = useState(0);
  const [importState, setImportState] = useState(ImportState.Start);
  const [importData, setImportData] = useState<ImportResults | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const importStatus = localStorage.getItem('importStatus');
      if (importStatus === 'Finished') {
        // If data has been imported successfully before, skip importing
        return;
      }

      setImportState(ImportState.Loading);
      const time = Date.now();

      try {
        const response = await fetch('/freight.json'); // Adjust path based on public directory
        const jsonData = await response.json();

        // Convert JSON data to a Blob and create a File object
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
        const file = new File([blob], 'freight.json', { type: 'application/json' });

        // Use the original importConfig function
        const data = await importConfig(file);
        if (data) {
          setImportData(data);
        }

        setDuration(Date.now() - time);
        setImportState(ImportState.Finished);

        // Save import status to localStorage
        localStorage.setItem('importStatus', 'Finished');
      } catch (error) {
        console.error('Error importing data:', error);
        setImportState(ImportState.Close);
      }
    };

    fetchData();
  }, []);

  if (importState === ImportState.Loading) {
    console.log(t('importModal.loading'));
  } else if (importState === ImportState.Finished) {
    console.log(t('importModal.finish.title'));
    if (!importData) {
      console.log(t('importModal.finish.onlySettings'));
    } else {
      console.log(t('importModal.finish.subTitle', { duration: (duration / 1000).toFixed(2) }));
      console.log('Import Results:', importData);
    }
  }

  return null; // No UI needed
};

export default AutoDataImporter;
