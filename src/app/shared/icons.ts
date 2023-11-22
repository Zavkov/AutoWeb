import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  ir.addSvgIcon(
    'cls',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/cls.svg')
  );
  ir.addSvgIcon(
    'del',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/del.svg')
  );
  ir.addSvgIcon(
    'edt',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/edt.svg')
  );
  ir.addSvgIcon(
    'inf',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/inf.svg')
  );
  ir.addSvgIcon(
    'chk',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/chk.svg')
  );
  ir.addSvgIcon(
    'add',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/add.svg')
  );
  ir.addSvgIcon(
    'updt',
    ds.bypassSecurityTrustResourceUrl('../assets/icons/updt.svg')
  );
};
