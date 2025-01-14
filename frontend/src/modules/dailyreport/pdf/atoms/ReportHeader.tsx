import React from 'react';
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';

import { getSanitizedImageSrc } from '../../utils/dailyReportUtils';

import { LabelValue } from './LabelValue';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  centerColumn: {
    textAlign: 'center',
    flex: 1,
  },
  logoColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'DejaVu Sans',
  },
  logo: {
    width: 100,
    height: 25,
    objectFit: 'contain',
  },
  subRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

const ReportHeader = ({ data }: { data?: DailyReportPreviewInfoQuery }) => {
  const logoSrc = getSanitizedImageSrc(data?.project?.logo || '');

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }} />

        <View style={styles.centerColumn}>
          <Text style={styles.title}>DAILY REPORT</Text>
          <Text style={styles.title}>
            {data?.project?.name || 'Unknown Project'}
          </Text>
        </View>

        <View style={styles.logoColumn}>
          {logoSrc && <Image src={logoSrc} style={styles.logo} />}
        </View>
      </View>

      <View style={styles.subRow}>
        <LabelValue
          label="Production"
          value={data?.project?.production_company || 'N/A'}
        />
        <LabelValue
          label="Shooting day"
          value={
            data?.shootingDay?.shooting_day_number
              ? `${data.shootingDay.shooting_day_number}/${
                  data.project?.shootingDays?.length || 'N/A'
                }`
              : 'N/A'
          }
        />
      </View>
    </>
  );
};
export default ReportHeader;
