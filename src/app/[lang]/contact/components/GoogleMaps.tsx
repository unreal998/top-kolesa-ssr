import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

export function GoogleMaps({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref !== null) {
      const map = new window.google.maps.Map(ref.current as HTMLInputElement, {
        center,
        zoom,
      });
      const myLatLng = {
        lat: 49.238440161453745,
        lng: 28.403964997993405,
      };
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: 'tireCenterGlobal',
      });
      const mySeccondLatLng = {
        lat: 49.203685,
        lng: 28.498228,
      };
      new google.maps.Marker({
        position: mySeccondLatLng,
        map,
        title: 'tireCenterTyrePlus',
      });
    }
  });

  return (
    <Box
      width="100%"
      height="500px"
      ref={ref}
      id="map"
      sx={{
        borderBottomRightRadius: '6px',
        borderTopRightRadius: '6px',
        '@media (max-width: 800px)': {
          width: '100%',
          height: '300px',
          borderBottomRightRadius: '6px',
          borderTopRightRadius: '0px',
        },
        '@media (max-width: 370px)': {
          height: '250px',
        },
      }}
    />
  );
}
