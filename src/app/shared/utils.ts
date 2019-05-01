declare var jQuery: any;


export class Utils {


  public static zero(n: number) {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }


  private static groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }


  public static groupByM(array, f) {
    let groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }


  static initializeUploadFile(url: string, token: string, className: string,
                              showRemove: boolean,
                              showUpload: boolean,
                              maxFileCount?: number,
                              uploadAsync?: boolean,
                              initialData?: any[],
                              initialPreviewConfig?: InitialPreviewConfig[],
                              deleteUrl?: string) {
    jQuery(className).fileinput({
      uploadUrl: url, // server upload action
      deleteUrl: deleteUrl, // server upload action
      uploadAsync: uploadAsync,
      showRemove: showRemove,
      showUpload: showUpload,
      maxFileCount: maxFileCount,
      overwriteInitial: false,
      initialPreview: initialData,
      initialPreviewAsData: true,
      initialPreviewFileType: 'image', // image is the default and can be overridden in config below
      initialPreviewConfig: initialPreviewConfig,
      purifyHtml: true, // this by default purifies HTML data for preview
      initialCaption: 'Drag and drop your image here',
      theme: 'explorer-fas',
      ajaxSettings: {headers: {'Authorization': 'Bearer ' + token}},
    });
  }


}


export class InitialPreviewConfig {
  caption?: string;
  size?: number;
  width?: string;
  type?: string;
  filetype?: string;
  url: string;
  key: number;
  downloadUrl?: string;
}
