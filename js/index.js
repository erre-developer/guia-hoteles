 $(function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });

            $('.carousel').carousel({
                interval: 5000 
            });

            $('#contacto').on('show.bs.modal', function (e) {
                console.log("El modal contacto se está mostrando");
                $('#contactoBtnModal').removeClass('btn-outline-success');
                $('#contactoBtnModal').addClass('btn-info');
                $('#contactoBtnModal').prop('disabled', true);
            });
            $('#contacto').on('shown.bs.modal', function (e) {
                console.log("El modal contacto sé mostró");
            });
            $('#contacto').on('hide.bs.modal', function (e) {
                console.log("El modal contacto se ocaulta");
            });
            $('#contacto').on('hidden.bs.modal', function (e) {
                console.log("El modal contacto sé ocultó");
                $('#contactoBtnModal').removeClass('btn-info');
                $('#contactoBtnModal').addClass('btn-outline-success');
                $('#contactoBtnModal').prop('disabled', false);
            });     